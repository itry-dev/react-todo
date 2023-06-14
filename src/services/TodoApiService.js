import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const LIMIT = process.env.REACT_APP_PAGE_SIZE;
const START_PAGE = 1;

class TodoApiService {

    #headers = {
        'Content-Type': 'application/json'
    };

    #todosRoute = '/todos';

    add(item) {        
        return axios
            .post(this.#todosRoute, JSON.stringify(item), {headers: this.#headers})
            .then(this.checkStatus);
    }

    getAll(pageStart, completedOnly = false) {
        if (pageStart === undefined) pageStart = START_PAGE;
        if (pageStart < 1) pageStart = START_PAGE;

        var url = this.#todosRoute+'?_limit='+LIMIT+'&_page='+pageStart
        if (typeof completedOnly !== 'undefined') url += '&completed='+completedOnly;

        return axios.get(url)
        .then(this.checkStatus)
        .then(function (response) {

            const totalRows = response.headers['x-total-count'] ? response.headers['x-total-count'] : 0;

            const result = {
                rows: response.data, 
                totalRows: totalRows,
                totalPages: totalRows > 0 ? Math.ceil(response.headers['x-total-count'] / LIMIT) : totalRows
            }

            return result;
        })
        
    }

    delete(id) {
        return axios
            .delete(this.#todosRoute + '/' + id)
            .then(this.checkStatus)
    }

    search(q){
        return axios.get(this.#todosRoute+'?q='+q)
        .then(this.checkStatus)
        .then(function (response) {
            return {
                rows: response.data,
                totalRows: 0,
                totalPages: 0
            };
        })
    }

    async edit(item) {
        await axios
            .patch(this.#todosRoute + '/' + item.id, JSON.stringify(item), {headers: this.#headers})
            .then(this.checkStatus)
    }

    checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          const httpErrorInfo = {
            status: response.status,
            statusText: response.statusText,
            url: response.url,
          };
          console.log(
            `logging http details for debugging: ${JSON.stringify(httpErrorInfo)}`
          );

          let errorMessage = TodoApiService.translateStatusToErrorMessage(
            httpErrorInfo.status
          );
          throw new Error(errorMessage);
        }
    }

    static translateStatusToErrorMessage(status) {
        switch (status) {
          case 401:
            return 'Please login again.';
          case 403:
            return 'You do not have permission to view the items.';
          default:
            return 'There was an error retrieving the items. Please try again.';
        }
    }
    
}

export default TodoApiService