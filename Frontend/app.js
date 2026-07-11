// =======================================
// InterviewAce AI Frontend JavaScript
// =======================================


// Smooth scroll to chat section

function scrollToChat(){

    const chatSection = document.getElementById("chat");

    if(chatSection){

        chatSection.scrollIntoView({

            behavior:"smooth"

        });

    }

}



// =======================================
// Scroll Animation
// =======================================


document.addEventListener(
"DOMContentLoaded",
()=>{


    console.log(
        "InterviewAce AI Loaded Successfully"
    );



    const sections =
    document.querySelectorAll(
        "section, .card, .hero-card"
    );



    sections.forEach(
        item=>{

            item.classList.add("fade");

        }
    );



    const observer =
    new IntersectionObserver(
        entries=>{


            entries.forEach(
                entry=>{


                    if(entry.isIntersecting){

                        entry.target.classList.add(
                            "show"
                        );


                    }


                }
            );


        },
        {

            threshold:0.15

        }

    );



    sections.forEach(
        item=>{

            observer.observe(item);

        }
    );


});




// =======================================
// Prevent accidental form reload
// =======================================


window.addEventListener(
"load",
()=>{


    console.log(
        "IBM watsonx Orchestrate Frontend Ready"
    );


});