const Engineer = require("../lib/Engineer");


test("I can initiate an instance of an Object of the engineer class", () =>{
    const testObj = new Engineer();

    expect(typeof(testObj)).toBe("object")
})
