/* Singleton */

// 1
function Singleton1() {
    if (typeof Singleton.instance === 'object') {
        return Singleton.instance;
    }

    Singleton.instance = this;
}

// 2
function Singleton() {
    const instance = this;
    Singleton = function() {
        return instance;
    }
}

/* Multiton (Registry) */

function Widget(key) {
    Widjet.instances[key] = this;
}

// cache
Widjet.instances = {};

/* Factory */


/* Composite */

$("singleitem").addClass('acitve');
$('div').addClass('active');


/* Command */
Manager.execute = function(command, ...args) {
    return Manager[command](...args);
};

/* Observer */
const observer = {
    subscribers: [],

    on(event, callback) {
        this.subscribers[event] = callback;
    },

    emit(event, ...args) {
        this.subscribers[event](...args);
    }
};

/* Strategy */
const ups = new UPS();
const usps = new USPS();
const fedex = new Fedex();

const shipping = new Shipping();

shipping.setStrategy(fedex);
log.add(`Fedex Strategy:${shipping.calculate()}`);