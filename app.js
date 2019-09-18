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
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function(totalIncome) {
        if(totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
    }

    Expense.prototype.getPercentage = function() {
        return this.percentage;
    };

    //calculate totals
    function calculateTotals(type) {
        var sum = 0;
        data.allItems[type].forEach(function(cur) {
            sum = sum + cur.value;
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

        deleteItem : function(type, id) {
            var ids, index;
            ids = data.allItems[type].map(function(current) {
                return current.id;
            });
            index = ids.indexOf(id);
            if(index !== -1) {
                data.allItems[type].splice(index, 1);
            }
            //console.log(index);
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
        },

        calculatePercentages : function() {
            data.allItems.exp.forEach(function(cur) {
                cur.calcPercentage(data.totals.inc);
            });
        },

        getPercentages : function() {
            var allPerc = data.allItems.exp.map(function(cur) {
                return cur.getPercentage();
            });
            return allPerc;
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
        expensesContainer : '.expenses__list',
        budgetLabel : '.budget__value',
        incomeLabel : '.budget__income--value',
        expensesLabel : '.budget__expenses--value',
        expensesPercentage : '.budget__expenses--percentage',
        container : '.container',
        expensesPercLabel : '.item__percentage'
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
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if(type === 'exp') {
                element = DOMStrings.expensesContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            //replace placeholder with actual text
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            //insert html into dom
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        deleteListItem : function(selectorID) {
            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
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
        },

        displayBudget : function(obj) {
            document.querySelector(DOMStrings.budgetLabel).textContent = '$' + obj.budget;
            document.querySelector(DOMStrings.incomeLabel).textContent = '+ $' + obj.totalInc;
            document.querySelector(DOMStrings.expensesLabel).textContent = '- $' +obj.totalExp;

            if(obj.percentage > 0) {
                document.querySelector(DOMStrings.expensesPercentage).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMStrings.expensesPercentage).textContent = '---';
            }
        },

        displayPercentages : function(percentages) {
            var fields = document.querySelectorAll(DOMStrings.expensesPercLabel);
            var nodeListForEach = function(list, callback) {
                for(var i = 0; i < list.length; i++) {
                    callback(list[i], i);
                }
            }

            nodeListForEach(fields, function(current, index) {
                if(percentages[index] > 0) {
                    current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = '---';
                }
            })
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

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
    };

    var updateBudget = function() {
        // 1. Calculate and update budget
        budgetCtrl.calculateBudget();
        // 2. Return the budget
        var budget = budgetCtrl.getBudget();
        // 3. Display budget on the UI
        UICtrl.displayBudget(budget);
        //console.log(budget);
    };

    var updatePercentages = function() {
        // 1. Calculate percentages
        budgetCtrl.calculatePercentages();
        //read percentages from nudget controller
        var percentages = budgetCtrl.getPercentages();
        //update UI with current percentage
        UICtrl.displayPercentages(percentages);
    };

    var ctrlAddItem = function() {
        var newItem;
        // 1. Get field input data
        var inputFields = UICtrl.getInput();
        // 2. Add item to budget controller
        if(inputFields.description !== "" && inputFields.value !== NaN && inputFields.value > 0) {

            newItem = budgetCtrl.addItem(inputFields.type, inputFields.description, inputFields.value);
            // 3. Add item to UI
            UICtrl.addListItem(newItem, inputFields.type);
            // 4. clear fields
            UICtrl.clearFields();
            // 5. Calculate and update budget
            updateBudget();
            // 6. Calculate and update percentages
            updatePercentages();

        }

    };

    var ctrlDeleteItem = function(e) {
        var itemID, splitID, ID;

        itemID = e.target.parentNode.parentNode.parentNode.parentNode.id;
        if(itemID) {
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);
            //delete item from data structure
            budgetCtrl.deleteItem(type, ID);
            //delete item from interface
            UICtrl.deleteListItem(itemID);
            //calculate and update budget
            updateBudget();
            //calculate and update percentages
            updatePercentages();
        }
    }

    return {
        init : function() {
            UICtrl.displayBudget({
                budget : 0,
                totalInc : 0,
                totalExp : 0,
                percentage : -1
            });
            setupEventListeners();
        }
    }
})(budgetController, UIController);

controller.init();

//add event listener to delete item
//delete irem from data structure
//delete item frm ui
//recalculate budgetupdate ui