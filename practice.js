var budgetController = (function() {
    var x = 23;
    var add = function(a) {
        return x + a;
    }

    return {
        publicTest: function(b) {
            return add(b);
        }
    }
})();

var UIController = (function(){

})();

/*
    var controller = (function(budgetCtrl, UICtrl) {
    var z = budgetCtrl.publicTest(10);

    return {
        publicCtrl: function() {
            console.log(z);
        }
    }
})(budgetController, UIController);
 */

 //accept number argument
 var controller = (function(budgetCtrl, UICtrl) {
     

     return {
         publicCtrl: function(num) {
            var z = budgetController.publicTest(num);
             console.log(z);
         }
     }
 })(budgetController, UIController);