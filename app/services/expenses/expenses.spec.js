describe('Expenses factory', function() {
  var Expenses;
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
  var singleExpense = {
    id: '6',
    name: 'Bob',
    role: 'Developer',
    location: 'New York',
    twitter: 'billybob'
  };

  beforeEach(angular.mock.module('api.expenses'));

  beforeEach(inject(function(_Expenses_) {
    Expenses = _Expenses_;
  }));

  it('should exist', function() {
    expect(Expenses).toBeDefined();
  });

  describe('.all()', function() {
    it('should exist', function() {
      expect(Expenses.all).toBeDefined();
    });

    it('should return a hard-coded list of expenses', function() {
      expect(Expenses.all()).toEqual(expenseList);
    });
  });

  describe('.findById()', function() {
    it('should exist', function() {
      expect(Expenses.findById).toBeDefined();
    });

    it('should return one expense object if it exists', function() {
      expect(Expenses.findById('2')).toEqual(singleExpense);
    });

    it('should return undefined if the expense cannot be found', function() {
      expect(Expenses.findById('10')).not.toBeDefined();
    });
  });
});
