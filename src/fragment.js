export const USER_FRAGMENT = `
fragment UserParts on User{
    id
    userName
    firstName
    lastName
    bio
    post {
        id
        caption
    }
}
`;