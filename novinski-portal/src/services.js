import posts from './data/posts.json'

export const getPosts = (success, timeout,start,end) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if(success) {
          resolve(posts.slice(start,end));
        } else {
          reject({message: 'Error'});
        }
      }, timeout||1000);
    });
  }