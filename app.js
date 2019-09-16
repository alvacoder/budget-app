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
        addBtn : '.add__btn',
        incomeContainer : '.income__list',
        expensesContainer : '.expenses__list'
    };
    
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
        },

        addListItem : function(obj, type) {
            var html, newHtml, element;
            //create html string with placeholder text
            if(type === 'inc') {
                element = DOMStrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if(type === 'exp') {
                element = DOMStrings.expensesContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            //replace placeholder with actual text
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            //insert html into dom
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        }
    }
    
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
        // 1. Get field input data
        var inputFields = UICtrl.getInput();
        // 2. Add item to budget controller
        newItem = budgetCtrl.addItem(inputFields.type, inputFields.description, inputFields.value);
        //console.log(inputFields);
        // 3. Add item to UI
        UICtrl.addListItem(newItem, inputFields.type);
        // 4. Calculate budget

        // 5. Display budget on the UI
    };

    return {
        init : function() {
            setupEventListeners();
        }
    }
})(budgetController, UIController);

controller.init();