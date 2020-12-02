import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';

const modalVariants = {
    init: { opacity: 0 },
    anim: {
        opacity: 1,
        transition: { delay: .5 }
    }

}

export default function modal({ modal, setModal }) {
    return (
        <AnimatePresence exitBeforeEnter>
            {modal && (
                <motion.div className="modal"
                    variants={modalVariants}
                    initial='init'
                    animate='anim'
                >
                    <div className="card-modal">
                        <h1>You lost!</h1>
                        <button> Another Game? </button>
                    </div>



                </motion.div>
            )}

        </AnimatePresence>
    )
}
