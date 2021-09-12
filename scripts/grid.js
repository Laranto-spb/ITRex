$(document).ready(function() {
  $("#sampleTable").fancyTable({
    sortColumn:0,
    pagination: true,
    perPage:20,
    globalSearch:true,
    inputPlaceholder: 'Search...',
  });		
});