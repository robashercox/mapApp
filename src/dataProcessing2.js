function equijoin(primary, foreign, primaryKey, foreignKey, select) {
    var m = primary.length, n = foreign.length, index = [], c = [];

    for (var i = 0; i < m; i++) {     // loop through m items
        var row = primary[i];
        index[row[primaryKey]] = row; // create an index for primary table
    }

    for (var j = 0; j < n; j++) {     // loop through n items
        var y = foreign[j];
        var x = index[y[foreignKey]]; // get corresponding row from primary
        c.push(select(x, y));         // select only the columns you need
    }

    return c;
}
Now you could use it as follows:

var c = equijoin(sydneySa1.features, avampireData.data, "id", "createdBy", function (a, b) {
    return {
        id: b.id,
        text: b.text,
        name: a.name
    };
});