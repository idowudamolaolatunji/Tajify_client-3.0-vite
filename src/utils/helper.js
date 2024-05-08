import moment from 'moment';


// CURRENCY CONVERTER / HELPER FORMATTER
export function currencyConverter (amount) {
    return Number(amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function numberConverter (amount) {
    return Number(amount).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
 

// DATE CONVERTER HELPER FUNCTION
export function dateConverter(givenDate, type='others') {
    const currentDate = moment().startOf('day');
    const inputDate = moment(givenDate);

    const diffInSeconds = moment().diff(inputDate, 'seconds');
    if (diffInSeconds < 60) {
        // return `${diffInSeconds} seconds ago`;
        return 'Just now';
    }

    const diffInMins = moment().diff(inputDate, 'minutes');
    if (diffInMins < 60) {
        return `${diffInMins} minute ago`;
    }
  
    if (inputDate.isSame(currentDate, 'day')) {
      return `Today, ${inputDate.format('h:mm A')}`; 
    } else if (inputDate.isSame(currentDate.clone().subtract(1, 'day'), 'day')) {
        return `Yesterday, ${inputDate.format('h:mm A')}`;
    } else if (inputDate.isSame(currentDate.clone().subtract(2, 'day'), 'day')) {
        return `Two days ago, ${inputDate.format('h:mm A')}`;
    } else {
        if(type === 'blog') {
            return inputDate.format('MMM D, YYYY');
        } else {
            return inputDate.format('MMM Do YYYY, h:mm A');
        }
    }
}


export function formatLikes(likes) {
    if (likes === 0) {
        return 'No likes';
    } else if (likes === 1) {
        return '1 like';
    } else if (likes < 1000) {
        return `${likes} likes`;
    } else if (likes < 10000) {
        const rounded = Math.round(likes / 100) / 10;
        return `${rounded}k`;
    } else if (likes < 1000000) {
        const rounded = Math.floor(likes / 1000);
        return `${rounded}k`;
    } else if (likes < 10000000) {
        const rounded = Math.round(likes / 100000) / 10;
        return `${rounded}m`;
    } else {
        const rounded = Math.round(likes / 1000000);
        return `${rounded}m`;
    }
}



export function truncateText (text, wordCount) {
    const words = text?.split(' ');
    if (words?.length > wordCount) {
      return words.slice(0, wordCount).join(' ') + '...';
    }
    return text;
};

export function capitalizeFirstLetter(string) {
    return string?.slice(0, 1)?.toUpperCase() + string?.slice(1);
}

export function getInitials(fullName) {
    const nameArray = fullName?.split(' ');
    if (nameArray?.length > 1) {
		const firstInitial = nameArray[0].charAt(0);
        const secondInitial = nameArray[1].charAt(0);
        return `${firstInitial}${secondInitial}`.toUpperCase();
    }
	if (nameArray?.length === 1) {
        return nameArray[0].charAt(0).toUpperCase();
    }
}
