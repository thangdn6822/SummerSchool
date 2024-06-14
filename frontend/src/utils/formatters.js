let apiRoot = ''


if (process.env.BUILD_MODE === 'dev') {
  apiRoot = 'http://localhost:5000'
}
if (process.env.BUILD_MODE === 'production') {
  // Trong này sẽ là đường dẫn đến back-end khi project phía back-end đã deploy lên cloud
  // apiRoot = ''
}

console.log('🚀 ~ apiRoot:', apiRoot)
export const API_ROOT = apiRoot