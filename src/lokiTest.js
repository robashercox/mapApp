var db = new loki();

var people = db.addCollection('people');
people.insert({ id: 0, name: 'Mary' });
people.insert({ id: 1, name: 'John' });
people.insert({ id: 2, name: 'Marta' });
people.insert({ id: 3, name: 'Robert' });
people.insert({ id: 4, name: 'Antonio' });

var cats = db.addCollection('cats');
cats.insert({ owner: 0, name: 'Betsy' });
cats.insert({ owner: 1, name: 'Bingo' });
cats.insert({ owner: 2, name: 'Fifi' });
cats.insert({ owner: 3, name: 'Fuzzy' });
cats.insert({ owner: 4, name: 'Gizmo' });

var left = people.chain().simplesort('id').limit(3);
var right = cats.chain();

var join = left.eqJoin(right, 'id', 'owner');
console.log(join.data().right);
