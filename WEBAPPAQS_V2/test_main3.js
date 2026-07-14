const buttons = document.querySelectorAll('button[data-page]');
        const frames = document.querySelectorAll('iframe[data-page]');
        const storageKey = 'aqs-selected-page';

        function setActiveButton(activeButton) {
            buttons.forEach(btn => {
                btn.classList.remove('bg-blue-200', 'hover:bg-blue-300', 'text-blue-900', 'dark:text-blue-900', 'dark:bg-blue-300', 'dark:hover:bg-blue-400', 'active');
                btn.classList.add('bg-white/20', 'hover:bg-white/40', 'dark:bg-black/20', 'dark:hover:bg-black/40', 'text-slate-600', 'dark:text-slate-300');
            });
            activeButton.classList.remove('bg-white/20', 'hover:bg-white/40', 'dark:bg-black/20', 'dark:hover:bg-black/40', 'text-slate-600', 'dark:text-slate-300');
            activeButton.classList.add('bg-blue-200', 'hover:bg-blue-300', 'text-blue-900', 'dark:text-blue-900', 'dark:bg-blue-300', 'dark:hover:bg-blue-400', 'active');
        }

        function showPage(page) {
            frames.forEach(frame => {
                frame.classList.toggle('hidden-frame', frame.dataset.page !== page);
            });
            localStorage.setItem(storageKey, page);
        }

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const page = button.dataset.page;
                setActiveButton(button);
                showPage(page);
            });
        });

        const savedPage = localStorage.getItem(storageKey) || 'Llamadas.html';
        const initialButton = Array.from(buttons).find(btn => btn.dataset.page === savedPage) || buttons[0];
        setActiveButton(initialButton);
        showPage(initialButton.dataset.page);

        // Keyboard navigation
        function handleKeyNavigation(e) {
            if (e.ctrlKey && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
                const buttonsArray = Array.from(buttons);
                const currentIndex = buttonsArray.findIndex(btn => btn.classList.contains('active'));
                if (currentIndex === -1) return;
                
                let newIndex = currentIndex;
                if (e.key === 'ArrowLeft') {
                    newIndex = (currentIndex - 1 + buttonsArray.length) % buttonsArray.length;
                } else if (e.key === 'ArrowRight') {
                    newIndex = (currentIndex + 1) % buttonsArray.length;
                }
                
                buttonsArray[newIndex].click();
                e.preventDefault();
            }
        }
        
        document.addEventListener('keydown', handleKeyNavigation);

        frames.forEach(frame => {
            frame.addEventListener('load', () => {
                try {
                    frame.contentWindow.document.addEventListener('keydown', handleKeyNavigation);
                } catch(err) {
                    console.log("No se pudo añadir el evento de teclado al iframe:", err);
                }
            });
        });
    