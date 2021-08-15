const Employee = require("../lib/Employee");

test("I can initiate an instance of an Object of the employee class", () =>{
    const testObj = new Employee();

    expect(typeof(testObj)).toBe("object")
})

test("If I declare a name then an object with a key 'name' should be created that I can call on", () => {
    const testObj = new Employee("Ben")

    expect(testObj.name).toBe("Ben")
})

test("If I declare an ID I should be able to call onthat property from the object instance", () => {
    const testObj = new Employee("Ben", 123)
    expect(testObj.id).toBe(123)
})