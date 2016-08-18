(function() {
  'use strict';

  angular.module('api.expenses', [])
  .factory('Expenses', function() {
    var Expenses = {};
    var expenseList = [
      {
        id: '1',
        expense: 'House',
        amount: '1500000'
      },
      {
        id: '2',
        expense: 'Familly',
        amount: '1500000'
      },
      {
        id: '3',
        expense: 'CarsHouse',
        amount: '25000'
      },
      {
        id: '4',
        expense: 'Lady',
        amount: '1502'
      }
    ];

    Expenses.all = function() {
      return expenseList;
    };

    Expenses.findById = function(id) {
      return expenseList.find(function(expense) {
        return expense.id === id;
      });
    };

    return Expenses;
  });
})();
