module.exports = (total_pages, page, delta=2)=>{

    const pages = [];
    const left = page - delta;
    const right = page + delta;
    for(i=1; i<=total_pages; i++){
        if(
            i===page ||
            i===1 ||
            i===total_pages ||
            (i >= left && i <= right)
        ){
            pages.push(i);
        }
        else if(
            i===left-1 ||
            i===right+1
        ){
            pages.push("...");
        }
    }
    return pages;
    // [1,...,3,4, 5 ,6,7,...,10]
}