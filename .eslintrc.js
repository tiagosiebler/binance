module.exports = {
    env: {
        es6: true,
        node: true,
        mocha: true
    },
    extends: 'eslint:recommended',
    rules: {
        // Style
        'array-bracket-newline': [
            'error',
            { 'multiline': true }
        ],
        'array-bracket-spacing': 'error',
        'block-spacing': 'error',
        'brace-style': 'error',
        'camelcase': 'error',
        'comma-dangle': ['error', 'never'],
        'comma-spacing': 'error',
        'comma-style': 'error',
        'computed-property-spacing': 'error',
        'eol-last': 'error',
        'func-call-spacing': 'error',
        'func-style': [
            'error',
            'declaration',
            { 'allowArrowFunctions': true }
        ],
        'implicit-arrow-linebreak': 'error',
        'indent': [
            'error',
            4
        ],
        'key-spacing': 'error',
        'keyword-spacing': 'error',
        'lines-between-class-members': 'error',
        'max-len': [
            'error',
            {
                'code': 100,
                'ignoreStrings': true
            }
        ],
        'max-statements-per-line': 'error',
        'multiline-comment-style': 'error',
        'new-cap': 'error',
        'new-parens': 'error',
        'newline-per-chained-call': 'error',
        'no-array-constructor': 'error',
        'no-lonely-if': 'error',
        'no-mixed-operators': 'error',
        'no-multiple-empty-lines': [
            'error',
            { 'max': 1 }
        ],
        'no-nested-ternary': 'error',
        'no-new-object': 'error',
        'no-tabs': 'error',
        'no-trailing-spaces': 'error',
        'no-underscore-dangle': [
            'error',
            { 'allowAfterThis': true }
        ],
        'no-unneeded-ternary': 'error',
        'no-whitespace-before-property': 'error',
        'object-curly-newline': [
            'error',
            { 'multiline': true }
        ],
        'object-curly-spacing': [
            'error',
            'always'
        ],
        'operator-linebreak': [
            'error',
            'after'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
        'semi-spacing': 'error',
        'semi-style': 'error',
        'space-in-parens': 'error',
        'space-infix-ops': 'error',
        'space-unary-ops': 'error',
        'spaced-comment': 'error',
        'switch-colon-spacing': 'error',

        // Possible Errors
        'getter-return': 'error',
        'no-template-curly-in-string': 'error',
        'no-console': 'off',

        // Best Practices
        'array-callback-return': 'error',
        'block-scoped-var': 'error',
        'curly': 'error',
        'dot-location': ['error', 'property'],
        'dot-notation': 'error',
        'eqeqeq': 'error',
        'no-else-return': 'error',
        'no-eq-null': 'error',
        'no-extra-bind': 'error',
        'no-floating-decimal': 'error',
        'no-implicit-coercion': 'error',
        'no-implicit-globals': 'error',
        'no-implied-eval': 'error',
        'no-invalid-this': 'error',
        'no-iterator': 'error',
        'no-labels': 'error',
        'no-lone-blocks': 'error',
        'no-loop-func': 'error',
        'no-multi-spaces': 'error',
        'no-multi-str': 'error',
        'no-new': 'error',
        'no-new-func': 'error',
        'no-new-wrappers': 'error',
        'no-octal-escape': 'error',
        'no-proto': 'error',
        'no-return-assign': 'error',
        'no-return-await': 'error',
        'no-self-compare': 'error',
        'no-sequences': 'error',
        'no-shadow': 'error',
        'no-shadow-restricted-names': 'error',
        'no-throw-literal': 'error',
        'no-unmodified-loop-condition': 'error',
        'no-undef-init': 'error',
        'no-use-before-define': 'error',
        'no-useless-call': 'error',
        'no-useless-concat': 'error',
        'no-useless-return': 'error',
        'no-var': 'error',
        'no-void': 'error',
        'no-with': 'error',
        'prefer-promise-reject-errors': 'error',
        'require-await': 'error',
        'wrap-iife': 'error',
        'yoda': 'error'
    }
};