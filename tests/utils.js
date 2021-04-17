const assertEq = (actualValue, expectedValue, assertName) => {
    if (actualValue == expectedValue) {
        console.log(`${assertName}: Ok`)
    } else {
        console.log(`${assertName} Error: expected ${expectedValue}, received ${actualValue}`)
    }
}

const assert = (condition, assertName) => {
    if (condition) {
        console.log(`${assertName}: Ok`)
    } else {
        console.log(`${assertName} Error`)
    }
}

module.exports.assertEq = assertEq;
module.exports.assert = assert;
