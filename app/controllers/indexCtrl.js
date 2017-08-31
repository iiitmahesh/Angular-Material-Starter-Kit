'use strict';

app.controller('toolbarCtrl', function($scope, $mdDialog) {

    var toolbarElements = [ { "name": "Dashboard", "icon": "view_comfy" },
                            { "name": "Notifications", "icon": "notifications" },
                            { "name": "Share", "icon": "share" },
                            { "name": "Phone", "icon": "phone" },
                            { "name": "Profile", "icon": "person" },
                            { "name": "More", "icon": "more_vert" }
                            ];
    $scope.toolbarElements = toolbarElements;

    var appData = {"title": "Fusion Style","subtitle":"Fashion is nothing without people!."};
    $scope.appData = appData;

    $scope.showAlert = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    // Modal dialogs should fully cover application
    // to prevent interaction outside of dialog
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('Notification from Developer')
        .textContent('This feature will be added soon...!')
        .ariaLabel('Alert Dialog Demo')
        .ok('Got it!')
        .targetEvent(ev)
    );
  };

});
