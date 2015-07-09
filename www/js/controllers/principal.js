angular.module('starter.controllers')
  .controller('RegistroCtrl', [
    '$scope',
    '$rootScope',
    '$ionicUser',
    '$ionicPush',
    function($scope, $rootScope, $ionicUser, $ionicPush) {

      $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
        prompt('Token registrado com sucesso', data.token);
        console.log('Ionic Push: Token recebido ', data.token, data.platform);
        $scope.token = data.token;
      });

      this.identificaUsuario = function() {
        console.log('Ionic User: Identificando com Ionic User Service');

        var user = $ionicUser.get();
        if (!user.user_id) {
          /* Se nao tiver id, gera um novo */
          user.user_id = $ionicUser.generateGUID();
        }

        /* Acrescenta algumas metadatas */
        angular.extend(user, {
          name: 'Usuário',
          bio: 'info sobre o usuário'
        });

        /* Identifica o usuario com o Ionic User Service */
        $ionicUser.identify(user).then(function() {
          $scope.identificado = true;
          alert('Usuário identificado: ' + user.name + '\n ID' + user.user_id);
        });
      };

      this.registrarPush = function() {
        console.log('Ionic Push: Registrando usuário');
        /* Registra com o Ionic Push Service. */
        /* Todos os parâmetros são opcionais. */
        $ionicPush.register({
          canShowAlert: true,
          canSetBadge: true,
          canPlaySound: true,
          canRunActionsOnWake: true,
          onNotification: function(notificacao) {
            console.log(notificacao);
            return true;
          }
        });
      };

    }
  ]);
