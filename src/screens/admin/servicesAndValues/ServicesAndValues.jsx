import {
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from './home.style';
import { AuthContext } from '../../../context/auth';
import { useContext, useEffect, useState } from 'react';
import Client from '../../../components/client/Client';
import icon from '../../../constants/icon';
import ServiceAndValue from '../../../components/serviceAndValue/ServiceAndValue';
import ModalCustom from '../../../components/modal/ModalCustom';

export default function ServicesAndValues(props) {
  const {
    user,
    loadAvailableServices,
    createService,
    deleteService,
    updateService,
  } = useContext(AuthContext);

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');
  const [modalAction, setModalAction] = useState(null); // 'delete' ou 'edit'
  const [serviceToModify, setServiceToModify] = useState(null);
  const [editDescription, setEditDescription] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Modal para adicionar
  const showCreateModal = () => {
    setEditDescription('');
    setEditPrice('');
    setModalAction('create');
    setIsModalVisible(true);
    setIsCreating(true);
  };
  // Modal para deletar
  const showDeleteModal = (servicoId) => {
    setModalText(
      'Deseja realmente excluir este serviço?\nEsta ação não pode ser desfeita!',
    );
    setServiceToModify(servicoId);
    setModalAction('delete');
    setIsModalVisible(true);
  };
  // Modal para editar
  const showEditModal = (service) => {
    setServiceToModify(service.servicoId);
    setEditDescription(service.descricao);
    setEditPrice(service.preco.toString());
    setModalAction('edit');

    setIsModalVisible(true);
  };

  const handleConfirm = () => {
    if (modalAction === 'delete' && serviceToModify) {
      handleDeleteService();
    } else if (modalAction === 'edit' && serviceToModify) {
      handleUpdateService();
    } else if (modalAction === 'create') {
      handleCreateService();
    }
  };

  async function handleCreateService() {
    try {
      await createService(editDescription, editPrice);
      const updatedServices = await loadAvailableServices();
      setServices(updatedServices);
      Alert.alert('Sucesso', 'Serviço criado com sucesso!');
    } catch (error) {
      console.error('Erro detalhado:', error);
    } finally {
      setIsModalVisible(false);
      setIsCreating(false);
    }
  }

  const handleUpdateService = async () => {
    try {
      await updateService(serviceToModify, editDescription, editPrice);
      const updatedServices = await loadAvailableServices();
      setServices(updatedServices);
      Alert.alert('Sucesso', 'Serviço atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar serviço:', error);
      Alert.alert('Erro', 'Não foi possível atualizar o serviço');
    } finally {
      setIsModalVisible(false);
    }
  };

  async function handleDeleteService() {
    setIsDeleting(true);
    try {
      await deleteService(serviceToModify);
      const updatedServices = await loadAvailableServices();
      setServices(updatedServices);
      Alert.alert('Sucesso', 'Serviço excluído com sucesso!');
    } catch (error) {
      console.error('Erro detalhado:', error);
    } finally {
      setIsDeleting(false);
      setIsModalVisible(false);
      setServiceToModify(null);
    }
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        if (user) {
          const servicesData = await loadAvailableServices();
          setServices(servicesData);
        }
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os dados');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {user.isAdmin ? (
        <View>
          <TouchableOpacity style={styles.plus} onPress={showCreateModal}>
            <Text>{icon.plusIcon}</Text>
            <Text>Novo serviço</Text>
          </TouchableOpacity>
          <Text style={{ height: 0.1, backgroundColor: 'black' }}></Text>
        </View>
      ) : (
        <View>
          <Text style={styles.text}>Serviços disponíveis</Text>

          <Text
            style={{ height: 0.1, backgroundColor: 'black', marginTop: 10 }}
          ></Text>
        </View>
      )}

      <FlatList
        data={services}
        keyExtractor={(service) => service.servicoId}
        renderItem={({ item }) => (
          <ServiceAndValue
            description={item.descricao}
            price={item.preco}
            onDelete={() => showDeleteModal(item.servicoId)}
            onEdit={() => showEditModal(item)}
            editIcon={icon.editIcon}
            deleteIcon={icon.deleteIcon}
            icon={icon.service}
          />
        )}
      />

      <ModalCustom
        isVisible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setIsCreating(false);
        }}
        onConfirm={handleConfirm}
        text={
          modalAction === 'delete'
            ? modalText
            : isCreating
            ? 'Criar Novo Serviço'
            : 'Editar Serviço'
        }
        cancelButtonText="Cancelar"
        confirmButtonText={modalAction === 'delete' ? 'Excluir' : 'Confirmar'}
        confirmButtonType={modalAction === 'delete' ? 'danger' : 'primary'}
        confirmButtonDisabled={modalAction !== 'delete' && (!editDescription || !editPrice)}
      >
        {(modalAction === 'edit' || modalAction === 'create') && (
          <>
            <View style={styles.editContainer}>
              <TextInput
                placeholder="Descrição do serviço"
                value={editDescription}
                onChangeText={setEditDescription}
                style={styles.input}
                multiline={true}
              />
            </View>

            <View style={styles.editContainer}>
              <TextInput
                placeholder="Preço (ex: 50.00)"
                value={editPrice}
                onChangeText={(text) =>
                  setEditPrice(text.replace(/[^0-9.]/g, ''))
                }
                keyboardType="decimal-pad"
                style={styles.input}
              />
            </View>
          </>
        )}
      </ModalCustom>
    </View>
  );
}
