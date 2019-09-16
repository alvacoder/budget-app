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

        //calculate totals
    function calculateTotals(type) {
        var sum = 0;
        data.allItems[type].forEach(function(cur) {
            sum = sum + cur.value;
            console.log(typeof cur.value);
        });
        data.totals[type] = sum;
    };

    var data = {
        allItems : {
            exp : [],
            inc : []
        },
        totals : {
            exp : 0,
            inc : 0
        },
        budget : 0,
        percentage : -1
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
        },

        //calculate budget
        calculateBudget : function() {
            // 1. calculate total income and expenses
            calculateTotals('inc');
            calculateTotals('exp');

            // 2. calculate budget : income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            // 3. calculate percentage of income spent
            if(data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                percentage = -1;
            }
        },


        //return budget
        getBudget : function() {
            return {
                totalInc : data.totals.inc,
                totalExp : data.totals.exp,
                budget : data.budget,
                percentage : data.percentage
            };
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
                value : parseInt(document.querySelector(DOMStrings.inputValue).value)
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
        },

        clearFields : function() {
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue);
            //convert fields to array
            fieldsArr = Array.prototype.slice.call(fields);
            
            fieldsArr.forEach(function(current, index, array) {
                current.value = "";
            });
            fieldsArr[0].focus();
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

    var updateBudget = function() {
        // 1. Calculate and update budget
        budgetCtrl.calculateBudget();
        // 2. Return the budget
        var budget = budgetCtrl.getBudget();
        // 3. Display budget on the UI
        console.log(budget);
    };

    var ctrlAddItem = function() {
        var newItem;
        // 1. Get field input data
        var inputFields = UICtrl.getInput();
        // 2. Add item to budget controller
        if(inputFields.description !== "" && inputFields.value !== NaN && inputFields.value > 0) {

            newItem = budgetCtrl.addItem(inputFields.type, inputFields.description, inputFields.value);
            //console.log(inputFields);
            // 3. Add item to UI
            UICtrl.addListItem(newItem, inputFields.type);
            //clear fields
            UICtrl.clearFields();

            updateBudget();

        }

    };

    return {
        init : function() {
            setupEventListeners();
        }
    }
})(budgetController, UIController);

controller.init();