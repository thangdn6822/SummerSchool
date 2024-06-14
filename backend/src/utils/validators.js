export const OBJECT_ID_RULE = /^[0-9]+$/
export const OBJECT_ID_RULE_MESSAGE = 'Your string fails to match the Object ID pattern!'
export const PASSWORD_RULE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
export const PASSWORD_RULE_MESSAGE = 'Your password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.'