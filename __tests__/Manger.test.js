const Manager = require("../lib/Manager")


test("I can initiate an instance of an Object of the employee class", () =>{
    const testObj = new Manager();

    expect(typeof(testObj)).toBe("object")
})
