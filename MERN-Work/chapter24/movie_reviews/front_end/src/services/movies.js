import axios from "axios";
class MovieDataService {
  getAll(page = 0) {
    return axios.get(`https://backend-lw2q.onrender.com?page=${page}`);
  }
  get(id) {
    return axios.get(`https://backend-lw2q.onrender.com/id/${id}`);
  }
  find(query, by = "title", page = 0) {
    return axios.get(
      `https://backend-lw2q.onrender.com?${by}=${query}&page=${page}`
    );
  }
  createReview(data) {
    return axios.post("https://backend-lw2q.onrender.com/review", data);
  }
  updateReview(data) {
    return axios.put("https://backend-lw2q.onrender.com/review", data);
  }
  deleteReview(id, userId) {
    return axios.delete("https://backend-lw2q.onrender.com/review", {
      data: { review_id: id, user_id: userId },
    });
  }
  getRatings() {
    return axios.get("https://backend-lw2q.onrender.com/ratings");
  }
}
export default new MovieDataService();
