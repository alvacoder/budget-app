var budgetController = (function(){
    //some code here
    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems : {
            exp : [],
            inc : []
        },
        totals : {
            exp : 0,
            inc : 0
        }
    }

    return {
        addItem : function(type, desc, val) {
            var newItem, ID;
            // create new ID
            if(data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            //create new item based on type
            if(type === 'exp') {
                newItem = new Expense(ID, desc, val);
            } else if(type === 'inc') {
                newItem = new Income(ID, desc, val);
            }
            //push new item into respective array
            data.allItems[type].push(newItem);
            return newItem;


        },

        testing : function() {
            console.log(data);
        }
    }
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
                type : document.querySelector(DOMStrings.inputType).value, //inc or exp
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
        var newItem;
        var inputFields = UICtrl.getInput();
        newItem = budgetCtrl.addItem(inputFields.type, inputFields.description, inputFields.value);
        //console.log(inputFields);
    };

    return {
        init : function() {
            setupEventListeners();
        }
    }
})(budgetController, UIController);

controller.init();