angular.module('starter.controllers', [])


.filter('percentage', ['$filter', function ($filter) {
  return function (input, decimals) {
    return $filter('number')(input * 100, decimals) + ' %';
  };
}])

.controller('AppCtrl', function($scope, ItemList, $localstorage, $timeout, $ionicLoading) {

    $scope.shouldAnimate = false;

    console.log($localstorage.getObject('cart'));
    $scope.cartItems = $localstorage.getArray('cart');


    $scope.grand = !angular.isArray($localstorage.getArray('grand')) ? $localstorage.getArray('grand') : {
        "Total": 0,
        "tax": 0
    }
    
    //Splash 
    $scope.intoCart = function(item) {
        $ionicLoading.show({
            template: 'Item already added to cart'
        });
        $timeout(function() {
            $ionicLoading.hide();
        }, 1300);

        $scope.shouldAnimate = true;

        $timeout(function() {
            $scope.shouldAnimate = false;
        }, 3000);

        $scope.cartItems.push(item);
        $localstorage.setObject('cart', $scope.cartItems);

        console.log($scope.cartItems);

    }

    $scope.destoryCart = function(item) {
        $scope.cartItems = [];
        $localstorage.destroy('cart');
    }

})

.controller('DashCtrl', function($scope, $state, $ionicModal, $localstorage, ItemList) {

  //Loading Item From  Services.js
  ItemList.findAll().then(function (itemvar) {
                 $scope.itemvar = itemvar;
                 console.log (itemvar);
            });
  
  //Store item to localstorage
    $scope.storeData = function() {
        $localstorage.setObject('cart', $scope.cartItems);
        console.log($scope.cartItems)
    }
    
    //Remove product from cart
    $scope.deleteProduct = function(deleteMe) {
        $scope.cartItems.splice(deleteMe, 1);

        if ($scope.cartItems.length) {
            for (var i = 0; i < $scope.cartItems.length; i++) {
                $scope.getTotal($scope.cartItems[i]);
            };
        } else {
             $scope.grand.Total = 0;
             $scope.grand.tax = 0;
            $localstorage.setObject('cart', $scope.cartItems);
            $localstorage.setObject('grand', $scope.grand)
        }

    }
  
    $scope.addQuantity = function(product) {
        if (angular.isUndefined(product.quantity)) {
            product.quantity = 1;
        } else {
            ++product.quantity;
        }

        for (var i = 0; i < $scope.cartItems.length; i++) {
            $scope.getTotal($scope.cartItems[i]);
        };
    }
    
    
    $scope.subtractQuantity = function(product) {
        if (angular.isUndefined(product.quantity) || product.quantity == 0) {
            product.quantity = 0;
        } else {
            --product.quantity;
        }

        for (var i = 0; i < $scope.cartItems.length; i++) {
            $scope.getTotal($scope.cartItems[i]);
        };
    }
    
    //Total product
    $scope.getTotal = function(product) {


        if (angular.isUndefined(product.quantity)) {
            product.quantity = 1;
        }
        
        //Tax Calculation for One Product
        product.tax2 = product.price * product.tax;
        console.log (product.tax2);
  
        product.total = product.quantity * (product.price + product.tax2) ; 
        console.log (product.total);
        $scope.grand.Total = 0;
        $scope.grand.tax = 0;

        for (i in $scope.cartItems) {

            $scope.grand.Total += $scope.cartItems[i].total;
            $scope.grand.tax += $scope.cartItems[i].tax2;
        }

        $localstorage.setObject('cart', $scope.cartItems);
        $localstorage.setObject('grand', $scope.grand)
    }
    
})

.controller('AccountCtrl', function($scope) {
  
});
