import React, { useState, useCallback } from 'react';
import { SlidePoint, SlideStyle } from './types';
import { generateSlideFromText } from './services/geminiService';
import Spinner from './components/Spinner';
import OriginalStyle from './components/styles/OriginalStyle';
import ProcessStyle from './components/styles/ProcessStyle';
import SketchStyle from './components/styles/SketchStyle';

const App: React.FC = () => {
    const [text, setText] = useState('');
    const [slideData, setSlideData] = useState<SlidePoint[][] | null>(null);
    const [selectedSlideIndex, setSelectedSlideIndex] = useState(0);
    const [selectedStyle, setSelectedStyle] = useState<SlideStyle>('original');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = useCallback(async () => {
        if (!text.trim()) {
            setError('Por favor, pega algo de texto de tu documento.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setSlideData(null);

        try {
            const result = await generateSlideFromText(text);
            setSlideData(result);
            setSelectedSlideIndex(0);
            setSelectedStyle('original');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ocurrió un error desconocido.');
        } finally {
            setIsLoading(false);
        }
    }, [text]);

    const handleReset = () => {
        setText('');
        setSlideData(null);
        setError(null);
        setIsLoading(false);
        setSelectedSlideIndex(0);
    };

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="text-center p-8">
                    <Spinner />
                    <p className="mt-4 text-gray-600 font-semibold">Generando 3 versiones de la diapositiva... Esto puede tardar un momento.</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="text-center p-8 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 font-bold">¡Ups! Algo salió mal.</p>
                    <p className="text-red-600 mt-2">{error}</p>
                    <button
                        onClick={handleReset}
                        className="mt-4 px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Intentar de Nuevo
                    </button>
                </div>
            );
        }

        if (slideData) {
            return (
                <div>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4 border-b-2 border-gray-300 pb-4">
                        <span className="font-bold text-gray-600 text-sm">VERSIÓN:</span>
                        {slideData.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedSlideIndex(index)}
                                className={`px-5 py-1.5 rounded-full font-bold text-xs transition-all duration-300 ${
                                    selectedSlideIndex === index
                                        ? 'bg-gray-900 text-white shadow-md'
                                        : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                     <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
                         <span className="font-bold text-gray-600 text-sm">ESTILO:</span>
                        {(['original', 'process', 'sketch'] as SlideStyle[]).map((style) => (
                            <button
                                key={style}
                                onClick={() => setSelectedStyle(style)}
                                className={`px-5 py-1.5 rounded-full font-bold text-xs capitalize transition-all duration-300 ${
                                    selectedStyle === style
                                        ? 'bg-yellow-400 text-gray-900 shadow-md'
                                        : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                {style === 'original' ? 'Original' : style === 'process' ? 'Proceso' : 'Boceto'}
                            </button>
                        ))}
                    </div>
                    
                    <div>
                        {selectedStyle === 'original' && <OriginalStyle points={slideData[selectedSlideIndex]} />}
                        {selectedStyle === 'process' && <ProcessStyle points={slideData[selectedSlideIndex]} />}
                        {selectedStyle === 'sketch' && <SketchStyle points={slideData[selectedSlideIndex]} />}
                    </div>

                     <div className="text-center pt-16">
                        <button
                            onClick={handleReset}
                            className="px-8 py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-900 transition-colors shadow-lg"
                        >
                            Crear Nueva Diapositiva
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div className="flex flex-col items-center gap-6">
                <p className="text-center text-gray-600 max-w-2xl">
                    ¡Bienvenido! Pega el contenido de tu PDF o documento. Analizaremos el texto y generaremos tres diapositivas de resumen para que elijas la que prefieras.
                </p>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Pega el texto de tu documento aquí..."
                    className="w-full h-64 p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
                    disabled={isLoading}
                />
                <button
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="px-10 py-4 bg-gray-900 text-white font-extrabold rounded-xl hover:bg-black transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-xl"
                >
                    Generar Diapositivas
                </button>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-yellow-50 p-4 sm:p-6 md:p-8 flex flex-col items-center">
            <main className="w-full max-w-4xl bg-[#f8f8f8] border-4 border-black rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12">
                <header className="text-center mb-10">
                    <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
                        PROCESO CREATIVO
                    </h1>
                    <p className="text-lg text-gray-500 mt-2">Generador de Diapositivas con IA</p>
                </header>
                {renderContent()}
            </main>
        </div>
    );
};

export default App;
