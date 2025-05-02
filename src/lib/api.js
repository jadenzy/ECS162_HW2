export async function fetchArticles() {
    let fetchError = false;
    let articles = []
    try {
        const res = await fetch('/api/key'); 
        const { apiKey } = await res.json();

        const todayDate = new Date();
        const lastWeekDate = new Date();

        lastWeekDate.setDate(todayDate.getDate() - 60);

        const formatDate = (/** @type {Date} */ date) => date.toISOString().split('T')[0].replace(/-/g, '');

        const beginDate = formatDate(lastWeekDate);
        const endDate = formatDate(todayDate);
        
        const response = await fetch(
            `https://api.nytimes.com/svc/search/v2/articlesearch.json?begin_date=${beginDate}&end_date=${endDate}&fq=timesTag.location%253A%22Sacramento%22&sort=newest&api-key=${apiKey}`
        );
        const data = await response.json();
        
        articles = data.response.docs.slice(0, 9);

        console.log(articles)
      
    } catch (error) {
        fetchError = true;
        console.error('Failed to fetch articles:', error);
    }

    return { articles, fetchError };
  }