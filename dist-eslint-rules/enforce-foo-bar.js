import { ESLintUtils } from '@typescript-eslint/utils';
const createRule = ESLintUtils.RuleCreator((name) => `https://example.com/rule/${name}`);
export const EnforceFooBar = createRule({
    meta: {
        type: 'problem',
        fixable: 'code',
        docs: {
            description: `Disallow use 'foo' in title`,
        },
        messages: {
            'enforce-foo-bar-message': `Must use 'bar' instead of 'foo'`,
        },
        schema: [],
    },
    name: 'enforce-foo-bar',
    defaultOptions: [],
    create(context) {
        return {
            VariableDeclarator(node) {
                /** Taskタイプかどう判定 */
                const isTaskType = () => {
                    const taskTypeRef = node.id.typeAnnotation?.typeAnnotation;
                    if (taskTypeRef?.type !== 'TSTypeReference')
                        return;
                    const typeName = taskTypeRef.typeName;
                    return typeName.type === 'Identifier' && typeName.name === 'Task';
                };
                if (!isTaskType())
                    return;
                /** オブジェクトのtitleの値がfooの場合は報告してbarに修正する */
                const taskObjectExpression = node.init;
                if (taskObjectExpression?.type !== 'ObjectExpression')
                    return;
                taskObjectExpression.properties.map((prop) => {
                    if (prop.type !== 'Property')
                        return;
                    if (prop.key.type !== 'Identifier')
                        return;
                    if (prop.key.name !== 'title')
                        return;
                    if (prop.value.type !== 'Literal')
                        return;
                    if (prop.value.value !== 'foo')
                        return;
                    context.report({
                        node: prop.value,
                        messageId: 'enforce-foo-bar-message',
                        fix(fixer) {
                            return fixer.replaceTextRange(prop.value.range, 'bar');
                        },
                    });
                });
            },
        };
    },
});
