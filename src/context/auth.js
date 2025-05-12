import { createContext, useEffect, useState } from 'react';
import { auth } from '../config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
  updateEmail,
  sendEmailVerification,
} from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  serverTimestamp,
  setDoc,
  where,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../config/firebase';

const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [barber, setBarber] = useState(null);
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState(null);

  // Função auxiliar para obter dados do usuário
  // Esta função é chamada após o login para obter os dados do usuário
  async function getUserData(uid) {
    // Verifica em qual coleção o usuário está
    const [clienteSnap, barbeiroSnap] = await Promise.all([
      getDoc(doc(db, 'clientes', uid)),
      getDoc(doc(db, 'barbeiros', uid)),
    ]);

    if (clienteSnap.exists()) return clienteSnap.data();
    if (barbeiroSnap.exists()) return barbeiroSnap.data();

    throw new Error('Dados do usuário não encontrados.');
  }

  async function signup(name, whatsapp, email, password, type) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      // Dados comuns a ambos os tipos
      const userData = {
        nome: name,
        emailAcesso: email,
        emailContato: email,
        whatsapp,
        criadoEm: serverTimestamp(),
        isAdmin:
          email === 'etiennecardosomarques@gmail.com' ||
          whatsapp === '11995174585' || email === 'admin@admin.com'
            ? true
            : false,
        perfil: type,
        uid: user.uid, // Adicionando o uid diretamente no objeto
      };

      // Adiciona campos específicos para cada tipo
      if (type === 'Cliente') {
        userData.clienteId = user.uid;
        await setDoc(doc(db, 'clientes', user.uid), userData);
      } else {
        userData.barbeiroId = user.uid;
        userData.servicos = [];
        await setDoc(doc(db, 'barbeiros', user.uid), userData);
      }

      // Atualiza o estado do contexto com os dados corretos
      setUser(userData);

      return user;
    } catch (error) {
      console.error('Erro ao fazer cadastro:', error);
      throw error;
    }
  }

  // Função de Login (Firebase)
  async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userData = await getUserData(userCredential.user.uid);
    
    // GARANTE que o uid está incluído nos dados
    const completeUserData = {
      ...userData,
      uid: userCredential.user.uid // ← Isso é crucial
    };
    
    setUser(completeUserData);
    return completeUserData;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
}

  // Função de Logout (Firebase)
  async function logout() {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      throw error;
    }
  }

  // Função de Exclusão de Conta (Firebase)
  // Esta função requer reautenticação do usuário antes de excluir a conta
  async function deleteAccount(currentPassword) {
    try {
      const user = auth.currentUser;

      if (!user) {
        throw new Error('Nenhum usuário logado');
      }

      // 1. Reautenticação (obrigatório para exclusão)
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword,
      );
      await reauthenticateWithCredential(user, credential);

      // 2. Antes de excluir, obter o UID do usuário para limpeza no Firestore
      const uid = user.uid;

      // 3. Apagar dados do usuário no Firestore
      await deleteUserData(uid);

      // 4. Excluir a conta no Firebase Auth
      await deleteUser(user);

      // 5. Atualizar estado
      setUser(null);

      return true; // Indica sucesso
    } catch (error) {
      console.error('Erro ao excluir conta:', error);
      throw error; // Pode ser tratado no componente
    }
  }

  // Função auxiliar para deletar dados do usuário no Firestore (necessário mexer aqui ainda)
  async function deleteUserData(uid) {
    try {
      // 1. Verifica em qual coleção o usuário está (cliente ou barbeiro)
      const [clienteSnap, barbeiroSnap] = await Promise.all([
        getDoc(doc(db, 'clientes', uid)),
        getDoc(doc(db, 'barbeiros', uid)),
      ]);

      // 2. Deleta o documento do usuário na coleção correta
      if (clienteSnap.exists()) {
        await deleteDoc(doc(db, 'clientes', uid));
        console.log(`Documento do cliente ${uid} deletado`);
      } else if (barbeiroSnap.exists()) {
        await deleteDoc(doc(db, 'barbeiros', uid));
        console.log(`Documento do barbeiro ${uid} deletado`);
      } else {
        console.log('Usuário não encontrado em nenhuma coleção');
      }

      // 3. Deleta os agendamentos associados ao usuário
      // Como um usuário pode ser tanto cliente quanto barbeiro, verificamos ambas as possibilidades
      const queries = [
        query(collection(db, 'agendamentos'), where('clienteId', '==', uid)),
        query(collection(db, 'agendamentos'), where('barbeiroId', '==', uid)),
      ];

      const querySnapshots = await Promise.all(queries.map((q) => getDocs(q)));

      // Combina todos os documentos a serem deletados
      const allDocsToDelete = querySnapshots.flatMap((snapshot) =>
        snapshot.docs.map((doc) => deleteDoc(doc.ref)),
      );

      await Promise.all(allDocsToDelete);
      console.log(
        `Todos os agendamentos relacionados ao usuário ${uid} foram deletados`,
      );
    } catch (error) {
      console.error('Erro ao deletar dados do usuário:', error);
      throw error; // Pode ser tratado no componente
    }
  }

  // Função para atualizar dados do usuário no Firestore
  // Esta função atualiza apenas os campos especificados no objeto `updatedData`
  async function updateUserData(updatedData, type) {
    let perfil;
    if (type === 'Cliente') {
      perfil = 'clientes';
    }
    if (type === 'Barbeiro') {
      perfil = 'barbeiros';
    }
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Nenhum usuário logado');

      // Referência ao documento do usuário no Firestore
      const userRef = doc(db, `${perfil}`, user.uid);

      // Atualiza apenas os campos especificados
      await setDoc(userRef, updatedData, { merge: true });

      // Atualiza o estado local
      setUser((prev) => ({ ...prev, ...updatedData }));

      return true;
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      throw error;
    }
  }

  async function updateUserPassword(newPassword, currentPassword) {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Nenhum usuário logado');

      // Reautenticar o usuário com a senha atual
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword,
      );
      await reauthenticateWithCredential(user, credential);

      // Atualizar a senha
      await updatePassword(user, newPassword);

      console.log('Senha atualizada com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar senha:', error);
      throw error;
    }
  }

  // Função para carregar os serviços disponíveis
  // Esta função retorna uma lista de serviços disponíveis no Firestore
  async function loadAvailableServices() {
    try {
      const querySnapshot = await getDocs(collection(db, 'servicos'));
      return querySnapshot.docs.map((doc) => ({
        servicoId: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Erro ao carregar serviços:', error);
      throw error;
    }
  }

  // Função para atualizar os serviços do barbeiro
  // Esta função atualiza os serviços do barbeiro no Firestore
  async function updateBarberServices(selectedServices) {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Nenhum usuário logado');

      const barberRef = doc(db, 'barbeiros', user.uid);
      await updateDoc(barberRef, {
        servicos: selectedServices,
      });

      // Atualiza o estado local
      setUser((prev) => ({
        ...prev,
        servicos: selectedServices,
      }));

      return true;
    } catch (error) {
      console.error('Erro ao atualizar serviços:', error);
      throw error;
    }
  }

  // Função para obter todos os barbeiros
  // Esta função retorna uma lista de barbeiros disponíveis no Firestore
  async function getBarbers() {
    try {
      const querySnapshot = await getDocs(collection(db, 'barbeiros'));
      const barbers = querySnapshot.docs.map((doc) => ({
        barbeiroId: doc.id,
        ...doc.data(),
      }));
      return barbers;
    } catch (error) {
      throw error;
    }
  }


  async function getBarberData(barbeiroId) {
  try {
    const barbeiroDoc = await getDoc(doc(db, 'barbeiros', barbeiroId));
    if (barbeiroDoc.exists()) {
      const barberData = barbeiroDoc.data();
      // Garante que o objeto sempre tenha a propriedade servicos (mesmo que vazia)
      const completeBarberData = {
        ...barberData,
        servicos: barberData.servicos || []
      };
      setBarber(completeBarberData);
      return completeBarberData;
    }
    throw new Error('Barbeiro não encontrado');
  } catch (error) {
    console.error('Erro ao buscar dados do barbeiro:', error);
    throw error;
  }
}

  // Função para obter todos os clientes
  async function getClients() {
    try {
      const querySnapshot = await getDocs(collection(db, 'clientes'));
      const clients = querySnapshot.docs.map((doc) => ({
        clienteId: doc.id,
        ...doc.data(),
      }));
      return clients;
    } catch (error) {
      throw error;
    }
  }

  // Função para obter dados de um cliente específico
  async function getClientData(clienteId) {
    try {
      const clienteDoc = await getDoc(doc(db, 'clientes', clienteId));
      if (clienteDoc.exists()) {
        const clientData = clienteDoc.data();
        setClient(clientData);
        return clientData;
      }
      throw new Error('Cliente não encontrado');
    } catch (error) {
      console.error('Erro ao buscar dados do cliente:', error);
      throw error;
    }
  }

  // Função para criar um agendamento
  async function createAppointment(appointmentData) {
  try {
    console.log('[DEBUG] Dados recebidos para agendamento:', appointmentData);
    
    // Verificação mais detalhada
    const requiredFields = [
      'barbeiroId',
      'clienteId',
      'data',
      'hora',
      'servicos',
      'precoTotal'
    ];
    
    const missingFields = requiredFields.filter(field => !appointmentData[field]);
    
    if (missingFields.length > 0) {
      throw new Error(`Campos obrigatórios faltando: ${missingFields.join(', ')}`);
    }

    const agendamentoId = doc(collection(db, 'agendamentos')).id;

    const agendamentoCompleto = {
      agendamentoId,
      barbeiroId: appointmentData.barbeiroId,
      barbeiroNome: appointmentData.barbeiroNome || '',
      clienteNome: appointmentData.clienteNome || '',
      clienteWhatsapp: appointmentData.clienteWhatsapp || '',
      clienteId: appointmentData.clienteId,
      servicos: appointmentData.servicos,
      data: appointmentData.data,
      hora: appointmentData.hora,
      precoTotal: appointmentData.precoTotal,
      status: 'agendado',
      criadoEm: serverTimestamp(),
      atualizadoEm: serverTimestamp(),
    };

    console.log('[DEBUG] Agendamento completo:', agendamentoCompleto);
    
    await setDoc(doc(db, 'agendamentos', agendamentoId), agendamentoCompleto);
    return { success: true, agendamentoId };
  } catch (error) {
    console.error('Erro detalhado ao criar agendamento:', {
      error,
      receivedData: appointmentData
    });
    throw error;
  }
}

  // Função para obter todos os agendamentos do usuário
  async function getAppointments() {
    try {
      const currentUser = auth.currentUser;
      let userId;

      console.log('Perfil do usuário:', user.perfil);
      if (user.perfil === 'Cliente') {
        userId = 'clienteId';
      } else {
        userId = 'barbeiroId';
      }

      const q = query(
        collection(db, 'agendamentos'),
        where(userId, '==', currentUser.uid),
      );
      const querySnapshot = await getDocs(q);
      const appointments = querySnapshot.docs.map((doc) => ({
        agendamentoId: doc.id,
        ...doc.data(),
      }));
      return appointments;
    } catch (error) {
      console.error('Erro ao buscar agendamentos:', error);
      throw error;
    }
  }

  // Função para deletar um agendamento
  async function deleteAppointment(agendamentoId) {
    try {
      await deleteDoc(doc(db, 'agendamentos', agendamentoId));
      console.log('Agendamento excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir agendamento:', error);
      throw error; // Pode ser tratado no componente
    }
  }

   async function createService(description, price) {
  try {
    console.log('[DEBUG] Dados recebidos para adicionar o novo serviço:', description, price);
    
    
    const servicoId = doc(collection(db, 'servicos')).id;

    const servicoCompleto = {
      servicoId,
      descricao: description,
      preco: price,
    };

    console.log('[DEBUG] Serviço completo:', servicoCompleto);
    
    await setDoc(doc(db, 'servicos', servicoId), servicoCompleto);
    return { success: true, servicoId };
  } catch (error) {
    console.error('Erro detalhado ao adicionar seviço:', {
      error,
      receivedData: {description, price}
    });
    throw error;
  }
}

async function updateService(servicoId, newDescription, newPrice) {
  try {

    console.log('[DEBUG] Dados recebidos para editar o serviço:', servicoId, newDescription, newPrice);

    const serviceRef = doc(db, 'servicos', servicoId);

      // Verifica se o documento existe
    const docSnap = await getDoc(serviceRef);
    if (!docSnap.exists()) {
      throw new Error(`Serviço com ID ${servicoId} não encontrado`);
    }

   await updateDoc(serviceRef, {
      descricao: newDescription,
      preco: newPrice,
      atualizadoEm: serverTimestamp()
    });
    
    return true;
  } catch (error) {
    console.error('Erro detalhado ao atualizar serviço:', {
      error,
      servicoId,
      newDescription,
      newPrice
    });
    throw error;
  }
}

  async function deleteService(servicoId) {
    try {

          console.log('[DEBUG] Dados recebidos para excluir o serviço:', servicoId);

      await deleteDoc(doc(db, 'servicos', servicoId));
      console.log('Serviço excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir serviço:', error);
      throw error; // Pode ser tratado no componente
    }
  }

  // Observa mudanças no estado de autenticação (usuário logado/deslogado)
  // Esta função é chamada sempre que o estado de autenticação muda
  // e atualiza o estado do usuário no contexto
  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser) {
      try {
        const [clienteSnap, barbeiroSnap] = await Promise.all([
          getDoc(doc(db, 'clientes', currentUser.uid)),
          getDoc(doc(db, 'barbeiros', currentUser.uid)),
        ]);

        let userData;
        if (clienteSnap.exists()) {
          userData = { ...clienteSnap.data(), uid: currentUser.uid };
        } else if (barbeiroSnap.exists()) {
          // Garante que barbeiros tenham servicos mesmo que vazio
          userData = { 
            ...barbeiroSnap.data(), 
            uid: currentUser.uid,
            servicos: barbeiroSnap.data().servicos || [] 
          };
        } else {
          console.error('Usuário não encontrado em nenhuma coleção');
          setUser(null);
          return;
        }
        
        setUser(userData);
      } catch (error) {
        console.error('Erro ao obter dados do usuário:', error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  });

  return unsubscribe;
}, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        signup,
        login,
        logout,
        deleteAccount,
        updateUserData,
        updateUserPassword,
        loadAvailableServices,
        updateBarberServices,
        getBarbers,
        barber,
        client,
        setBarber,
        setClient,
        getBarberData,
        createAppointment,
        getAppointments,
        deleteAppointment,
        getClients,
        getClientData,
        createService,
        updateService,
        deleteService,
        loading, // Útil para evitar renderização prematura
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
