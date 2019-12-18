//Budget Controller
var budgetController = (function () {

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: [],
        },
        totals: {
            exp: 0,
            inc: 0
        }

    }

    return {
        addItem: function (type, desc, val) {
            var newItem, ID;
            //new id with id one greater than last item in array
            ID = data.allItems[type][data.allItems[type].length - 1].id + 1;

            if (type === "exp") {
                newItem = new Expense(ID, desc, val);
            } else if (type === "inc") {
                newItem = new Income(ID, desc, val)
            }
            //push into data structure
            data.allItems[type].push(newItem);
            return newItem;
        }
    }


})();

//UI Controller
var UIController = (function () {
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        submitButton: '.add__btn'
    }

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            }
        },
        getDOMstrings: function () {
            return DOMstrings;
        }
    }
})();

//Global Controller
var controller = (function (budgetCtrl, UICtrl) {

    var setupEventListeners = function () {
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.submitButton).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                event.preventDefault();
                ctrlAddItem();
            }
        });
    };

    var ctrlAddItem = function () {
        var input, newItem; 
        input = UICtrl.getInput();
        // Add item to budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        // Add new UI item
        // Calc budget
        // Display budget
    };

    return {
        init: function () {
            setupEventListeners();
        }
    };

})(budgetController, UIController);

controller.init();

