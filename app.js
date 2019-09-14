var budgetController = (function() {
    //do something
})();

var UIController = (function() {
    //get input
    var DOMStrings = {
        type : '.add__type',
        description : '.add__description',
        value : '.add__value',
        inputBtn : '.add__btn'
    }

    return {
        getInput: function() {
            return {
                type : document.querySelector(DOMStrings.type).value,
                description : document.querySelector(DOMStrings.description).value,
                value : document.querySelector(DOMStrings.value).value,
            };
        },

        getDOMStrings : function() {
            return DOMStrings;
        }
    };
})();

var controller = (function(budgetCtrl, UICtrl) {

    var DOM = UICtrl.getDOMStrings();

    function ctrlAddItem() {
        // 1. Get field input data
        var inputFields = UICtrl.getInput();
        // 2. Add item to budget controller
        // 3. Add item to UI
        // 4. Calculate budget
        // 5. Display budget on the UI
        console.log(inputFields);
    }
    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(e) {
        if(e.keyCode === 13 || e.which === 13) {
            ctrlAddItem();
        }
    });
})(budgetController, UIController);