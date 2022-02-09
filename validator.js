const VALIDATOR = {
    'required': (value, param) => !!(value.lenght === 0),
    'min-length': (value, param) => !!(value.lenght < param),
    'max-length': (value, param) => !!(value.length > param),
}