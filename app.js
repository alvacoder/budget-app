var budgetController = (function() {
    //do something
})();

var UIController = (function() {
    //do something
})();

var controller = (function(budgetCtrl, UICtrl) {

    function ctrlAddItem() {
        // 1. Get field input data
        // 2. Add item to budget controller
        // 3. Add item to UI
        // 4. Calculate budget
        // 5. Display budget on the UI
        console.log('Item Added');
    }
    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(e) {
        if(e.keyCode === 13 || e.which === 13) {
            ctrlAddItem();
        }
    });
})(budgetController, UIController);