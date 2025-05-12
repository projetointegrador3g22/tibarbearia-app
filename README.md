## Siga as instruções abaixo para acessar o projeto

Clonar o repositório:
```bash
git clone https://github.com/projetointegrador3g22/tibarbearia-app.git
```

Abra o projeto no VS Code e instale as dependências:
```bash
npm install
```

Baixe o aplicativo Expo Go para celular na versão do SDK 52 (preferencialmente um celular android, pois a Apple não oferece suporte para download de versões mais antigas. Obs.: a versão mais recente do SDK é a 53, mas apresentou muitos problemas no mundo inteiro e não foi possível rodar o projeto nela), no endereço abaixo:
```bash
https://expo.dev/go

obs.: Baixe e instale o APK em seu celular, confira se a permissão para instalar apps de fontes desconhecidas está habilitada.
obs 2.: O site oferece a instalação de simulador IOS no PC, o mesmo aceita a versão 52 do SDK.
```

Instale as dependências do projeto (terminal do VS Code):
```bash
npm install
```

Inicie o projeto no servidor (terminal do VS Code):
```bash
npx expo start
```

Um QR Code será exibido no terminal, então siga os passos a seguir:
```bash
1. Abra o app Expo Go em seu celular android;
2. Selecione a opção "Scan QR code";
3. Aponte a câmera para o QR code e aguarde o projeto ser carregado na tela do seu celular.
Obs.: tanto o celular quanto seu PC ou notebook precisam estar conectados à mesma rede de internet para a aplicação funcionar.
```

Para fins de teste, utilize as credenciais abaixo ao fazer login:

Cliente
```bash
email => cliente@cliente.com
senha => 123456
```
Barbeiro
```bash
email => barbeiro@barbeiro.com
senha => 123456
```
Admin
```bash
email => admin@admin.com
senha => 123456
```

Alguns ajustes ainda estão em andamento. Por esse motivo algumas funcionalidades poderão falhar.

Obs.: caso dê alguma falha e aplicação "quebre", no terminal do VS Code que está rodando o servidor (não pare utilizando CTRL + C), digite a tecla "R" que o projeto será recarregado novamente na tela do celular.