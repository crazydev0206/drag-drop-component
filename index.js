        // Comme dab vous pouvez enlever la fonction getRandomColor
        // Cela me sert juste à voir ce que je déplace et ce qui a changé
        let getRandomColor = () => {
            let letters = "0123456789ABCDEF";
            let color = "#";
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        };

        let currentId = null;

        const EXTRA_SPACE = 5;


        // Selectionne tous les élements déplaçables
        // et qui peuvent recevoir les éléments déplaçables

        const draggables = document.querySelectorAll(".draggable");
        const rows = document.querySelectorAll(".row");




        rows.forEach(row => {
            row.classList.add('dropzone');
        });
        // Rendre les éléments déplaçables


        draggables.forEach((dragElt) => {
            dragElt.classList.add('dropzone');
            dragElt.setAttribute("draggable", true);
            dragElt.addEventListener('dragstart', onDragStart, false);
        });

        const droppables = document.querySelectorAll(".dropzone");




        // Associer les fonctions aux évenements

        droppables.forEach((dropElt) => {
            dropElt.addEventListener('drop', onDrop, false);
            dropElt.addEventListener('dragover', onDragOver, false);
            dropElt.addEventListener('mousemove', onMouseMove, false);
        });

        // Définition des fonctions des evenements
        function onDragStart(event) {
            currentId = event.target.id;
            event.dataTransfer.setData("text", event.target.id);
            event.currentTarget.style.backgroundColor = "#dfa612";
        }

        function onDragOver(event) {

            event.preventDefault();
            event.stopPropagation();

            const id = currentId;
            const draggableElement = document.getElementById(id);
            let dropzone = event.currentTarget;

            if (dropzone.classList.contains('draggable')) {
                if (event.target.offsetTop < draggableElement.offsetTop + EXTRA_SPACE) {
                    dropzone.parentElement?.insertBefore(draggableElement, dropzone);
                } else if (event.target.offsetTop > draggableElement.offsetTop) {
                    dropzone.parentElement?.insertBefore(
                        draggableElement,
                        dropzone.nextSibling
                    );

                } else {
                    dropzone.parentElement?.insertBefore(
                        draggableElement,
                        dropzone.nextSibling
                    );
                }

            }

            else {

                dropzone.appendChild(draggableElement);
            }
            draggableElement.classList.add("dropzone");

            // event.dataTransfer.clearData();
        }

        function onDrop(event) {

            event.stopPropagation();

            const id = event.dataTransfer.getData("text");
            const draggableElement = document.getElementById(id);
            let dropzone = event.currentTarget;
            
            if (dropzone.classList.contains('draggable')) {
                if (event.target.offsetTop < draggableElement.offsetTop + EXTRA_SPACE) {
                    dropzone.parentElement?.insertBefore(draggableElement, dropzone);
                } else if (event.target.offsetTop > draggableElement.offsetTop) {
                    dropzone.parentElement?.insertBefore(
                        draggableElement,
                        dropzone.nextSibling
                    );

                } else {
                    dropzone.parentElement?.insertBefore(
                        draggableElement,
                        dropzone.nextSibling
                    );
                }

            }

            else {

                dropzone.appendChild(draggableElement);
            }
            draggableElement.classList.add("dropzone");

            draggableElement.style.backgroundColor = getRandomColor();
            event.dataTransfer.clearData();

            setOrder();

            currentId = null;
        }

        function onMouseMove(event) {

            // event.preventDefault();
            // event.stopPropagation();

            if(event.buttons == 1 && currentId) {
                const id = currentId;
                const draggableElement = document.getElementById(id);

                console.log(id);
                console.log(draggableElement);
                console.log(this);
            }
        }

        function setOrder() {
            //   Recupération des éléments sélectionés avec l'ordre et leur id
            const tables = document.querySelectorAll(".table");

            tables.forEach((table, tableIndex) => {


                const rowsInTable = table.querySelectorAll('.row');

                rowsInTable.forEach((row, rowIndex) => {


                    const rowDraggables = row?.querySelectorAll(".draggable");

                    rowDraggables?.forEach((draggableElt, dragEltindex) => {

                        draggableElt.querySelector("#id_tab").value = tableIndex + 1;
                        draggableElt.querySelector("#id_row").value = rowIndex + 1;
                        draggableElt.querySelector("#id_line").value = dragEltindex + 1;


                    });
                });
            });

            /************************ JUSQU'ICI ********************************/
        }

