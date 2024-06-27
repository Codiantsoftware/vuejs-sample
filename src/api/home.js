// Home object represents home-related API endpoints and their methods
const Home = {
  // Endpoint for updating user profile
  updateProfile: {
    url: '/update-profile', // API endpoint URL for updating user profile
    method: 'PUT' // HTTP method used for updating user profile
  },
  // Endpoint for upload profile
  imageUpload: {
    url: '/media/upload/user/image', // API endpoint URL for upload profile
    method: 'POST' // HTTP method used for upload profile
  }
}
export default Home
