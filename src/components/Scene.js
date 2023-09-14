import {useRef, useEffect} from 'react';
import { MountScene, CleanUp, Selection} from '../utils/utils';
import '../App.css'

export const Scene = () => {
    const mountRef = useRef(null);

    const handleSelection = (event) =>{
        Selection(event.target.value)
    }

    useEffect(() => {
        MountScene(mountRef)

        return () => {
            CleanUp(mountRef)
        }

    }, [])  

    return (
        <>
            <div>
                <select onChange={handleSelection} className='selector'>
                    <option value="">Select a Side</option>
                    <option value="Front">Front</option>
                    <option value="Back">Back</option>
                    <option value="Left">left</option>
                    <option value="Right">Right</option>
                </select>
            </div>
            <div className='ModelContainer' ref={mountRef}></div>
        </>
    )
} 