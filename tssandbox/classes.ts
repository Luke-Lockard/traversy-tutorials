interface UserInterface {
    // name: string;
    email: string;
    age: number;
    getName(): string;
    register(): any;
    payInvoice(): any;
}


class User implements UserInterface {
    private name: string;
    email: string;
    age: number;

    constructor(name: string, email: string, age: number) {
        this.name = name;
        this.email = email;
        this.age = age;

        console.log('User Created: ' + this.name);
    }

    public getName() {
        return this.name;
    }

    register() {
        console.log(this.name + ' is now registered');
    }

    payInvoice() {
        console.log(this.name + ' paid invoice');
    }
}

// let john = new User('John Doe', 'john@gmail.com', 30);

// john.register();

class Member extends User {
    id: number;

    constructor(id: number, name: string, email: string, age: number) {
        super(name, email, age);
        this.id = id;
    }

    payInvoice() {
        super.payInvoice();
    }
}

let mike: User = new Member(1, 'Mike Smith', 'mike@gmail.com', 31);
mike.payInvoice();