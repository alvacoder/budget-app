var budgetController = (function(){
    //some code here
})();

var UIController = (function() {
    //some code here
    var DOMStrings = {
        inputType : '.add__type',
        inputDescription : '.add__description',
        inputValue : '.add__value',
        addBtn : '.add__btn'
    };
    // 1. Get field input data
    return {
        getDOMStrings : function() {
            return DOMStrings;
        },

        getInput : function() {
            return {
                type : document.querySelector(DOMStrings.inputType).value,
                description : document.querySelector(DOMStrings.inputDescription).value,
                value : document.querySelector(DOMStrings.inputValue).value
            };
        }
    }
    // 2. Add item to budget controller
    // 3. Add item to UI
    // 4. Calculate budget
    // 5. Display budget on the UI
})();

var controller = (function(budgetCtrl, UICtrl) {
    //some code here
    function setupEventListeners() {
        var DOM = UICtrl.getDOMStrings();

        document.querySelector(DOM.addBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(e) {
            if(e.keyCode === 13 || e.which === 13) {
                ctrlAddItem();
            }
        });
    };

    var ctrlAddItem = function() {
        var inputFields = UICtrl.getInput();
        console.log(inputFields);
    };

    return {
        init : function() {
            setupEventListeners();
        }
    }
})(budgetController, UIController);

controller.init();