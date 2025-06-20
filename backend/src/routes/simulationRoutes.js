import express from 'express';
import { createSimulation, getAllScenarios, deleteScenario } from '../controllers/simulationController.js';
import { protect } from '../auth/middleware/auth.js';

const router = express.Router();

// Protect all routes
router.use(protect);

router.post('/simulate', async (req, res) => {
    try {
        // The createSimulation controller handles validation and AI simulation internally
        await createSimulation(req, res); // Pass req and res directly to the controller
    } catch (error) {
        console.error('Error in simulation route handler:', error); // Log original error
        // createSimulation already sends a response, but this acts as a final fallback
        if (!res.headersSent) {
            res.status(500).json({
                success: false,
                error: error.message || 'Failed to process simulation via route handler'
            });
        }
    }
});

router.get('/scenarios', getAllScenarios);
router.delete('/scenarios/:id', deleteScenario);

export default router; 