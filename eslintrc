module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true
    },
    extends: ['airbnb'],
    parser: 'babel-eslint',
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    plugins: ['react', 'react-hooks'],
    rules: {
        'react-hooks/rules-of-hooks': 'error',
        'no-unexpected-multiline': 'error',
        'comma-dangle': ['error', 'never'],
        'linebreak-style': ['error', 'unix'],
        'no-underscore-dangle': 0,
        'class-methods-use-this': 0,
        'func-names': 0,
        'no-plusplus': 0,
        'max-len': [
            'error',
            {
                code: 120
            }
        ],
        indent: [
            1,
            4,
            {
                SwitchCase: 1
            }
        ],
        'import/no-unresolved': 0,
        'import/extensions': 0,
        'import/no-named-as-default': 0,
        'jsx-a11y/click-events-have-key-events': 0,
        'jsx-a11y/no-static-element-interactions': 0,
        'jsx-a11y/anchor-is-valid': [
            'error',
            {
                components: ['Link'],
                specialLink: ['to']
            }
        ],
        'jsx-a11y/label-has-for': [
            2,
            {
                components: ['Label'],
                required: {
                    every: ['id']
                }
            }
        ],
        'react/forbid-prop-types': 0,
        'react/jsx-indent': [1, 4],
        'react/jsx-indent-props': [1, 4],
        'no-console': 0
    }
};
