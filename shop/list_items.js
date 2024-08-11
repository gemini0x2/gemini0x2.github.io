
function setupSlider() {
    $(document).ready(function(){
      $('.slider').slick({
          dots: true,
          // infinite: true,
          arrows:true,
      });
    }); 
  }

function load_items(filepath) {
    let type = ""
    if (filepath.includes("movies")) {
        type = "movies"
    } else {
        type = "pictures"
    }

    document.addEventListener('DOMContentLoaded', function() {
        fetch(filepath)
            .then(response => response.text())
            .then(data => {
                // Split the file contents into an array of filenames
                let fileArray = data.trim().split('\n');
                
                // Sort the filenames
                fileArray.sort();

                // Group filenames by their base names (excluding the last number and extension)
                let groupedFiles = {};
                fileArray.forEach(file => {
                    let baseName = file.replace(/\d+\.jpg$/, ''); // Remove last number and extension
                    if (!groupedFiles[baseName]) {
                        groupedFiles[baseName] = [];
                    }
                    groupedFiles[baseName].push(file);
                });

                // Output the HTML
                htmlOutput = ''
                for (const [baseName, files] of Object.entries(groupedFiles)) {
                    const filename = baseName.substring(0, baseName.length - 1);
                    htmlOutput += `<div class="group relative">`;
                    htmlOutput += `<div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75">`;
                    htmlOutput += `<div class="slider">`
                    files.forEach(file => {
                        htmlOutput += ` <div>`
                        htmlOutput += `     <a href="https://gemini0x2.arcscolle2373.workers.dev/2:/selling/${type}/${file}" data-lity>`
                        htmlOutput += `         <img src="https://gemini0x2.arcscolle2373.workers.dev/2:/selling/${type}/${file}" class="object-contain object-center h-48 w-96">`;
                        htmlOutput += `     </a>`
                        htmlOutput += ` </div>`
                    });
                    htmlOutput += `</div>`
                    htmlOutput += `</div>`
                    htmlOutput += `<div class="mt-4 flex justify-center">`
                    htmlOutput += `<div class="text-pretty">`
                    htmlOutput += ` <p class="text-sm text-gray-700 break-all">${filename}</p>`
                    // htmlOutput += ` <p class="text-sm font-medium text-gray-900">$35</p>`
                    htmlOutput += `</div>`
                    htmlOutput += `</div>`
                    htmlOutput += `</div>`
                    htmlOutput += `</div>`
                }

                // Display the output
                document.getElementById('items-container').innerHTML = htmlOutput;
                // 
                setupSlider();
            })
            .catch(error => {
                console.error('Error fetching file:', error);
            });
    });

}