const { errorMsg, usageMsg } = require('./utils/logs');
const {stdin, stdout, stderr, argv} = process

// npm
import is from '@sindresorhus/is';

class JsonExplorer {
    constructor() {
        this.input = "";
        this.filter = argv[2];
        this.usage = usageMsg;
    }

    // extractString(data, nextValue) {
    //     return data
    // }

    // extractNumber(data, nextValue) {
    //     return data
    // }

    // extractArray(data, nextValue) {
    //     if (nextValue) {
    //         return data.reduce((acc, e) => [...acc, {[nextValue]: e[nextValue]}],[]);
    //     }
    //     return data
    // }

    // extractObject(data, nextValue) {
    //     if (nextValue) {
    //         main(data, this.filter)
    //         return;
    //     }
    //     return data
    // }

    main(data, filter = [], skip = false) {
        const currentKey = skip ? filter[1] : filter.shift();
        const currentValue = skip ? data : data[currentKey];
        const nextValue = skip ? filter[1] : filter[0];

        switch (true) {
            case is.array(currentValue):
                console.log("is.array")
                if (nextValue) {
                    return currentValue.reduce((acc, e) => {
                        return [...acc, main(e[nextValue], filter, true)]
                    }, []);
                }
                return currentValue
                break;
            case is.object(currentValue):
                console.log("is.object")
                if (nextValue) {
                    return main(currentValue[nextValue], filter, true);
                }
                return currentValue;
                break;
            default:
                return currentValue
                break;
        }
    }

    init() {
        stdin.setEncoding('utf8')

        if (!this.filter || stdin.isTTY) {
            stderr.write(this.usage)
            process.exit(2)
        }
        
        stdin.on('readable', () => {
            this.input = stdin.read();
            this.input && this.main(this.input.split('.'), this.filter)
        })
    }
}

new JsonExplorer().init()