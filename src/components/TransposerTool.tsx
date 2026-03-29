"use client"

import { useState } from "react";
import { transposeChordsWithSuggestions } from "@/ai/flows/transpose-chords-with-suggestions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, Loader2, Sparkles, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TransposerToolProps {
  initialChords?: string;
}

export function TransposerTool({ initialChords = "" }: TransposerToolProps) {
  const [chords, setChords] = useState(initialChords);
  const [targetKey, setTargetKey] = useState("D Major");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const handleTranspose = async () => {
    if (!chords.trim()) {
      toast({ title: "Error", description: "Please enter some chords first.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const output = await transposeChordsWithSuggestions({
        chordProgression: chords,
        targetKey: targetKey
      });
      setResult(output);
    } catch (err) {
      toast({ title: "Error", description: "Failed to transpose. Please check your internet connection.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="w-5 h-5 text-primary" />
          AI Intelligent Transposer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label>Original Progression</Label>
            <Input 
              value={chords} 
              onChange={(e) => setChords(e.target.value)} 
              placeholder="e.g. Am G C F"
              className="bg-background font-mono"
            />
          </div>
          <div className="flex gap-4 items-end">
            <div className="flex-1 space-y-2">
              <Label>Target Key</Label>
              <Input 
                value={targetKey} 
                onChange={(e) => setTargetKey(e.target.value)} 
                placeholder="e.g. D Major"
                className="bg-background"
              />
            </div>
            <Button onClick={handleTranspose} disabled={loading} className="music-gradient text-background font-bold gap-2">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
              Transpose
            </Button>
          </div>
        </div>

        {result && (
          <div className="mt-6 p-4 rounded-xl bg-background border border-border animate-in fade-in slide-in-from-top-2">
            <div className="mb-4">
              <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Transposed Progression</span>
              <div className="text-xl font-mono text-primary font-bold mt-1">
                {result.transposedProgression}
              </div>
            </div>
            <div>
              <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">AI Suggestions</span>
              <p className="text-sm mt-1 leading-relaxed text-muted-foreground">
                {result.suggestions}
              </p>
            </div>
            <div className="mt-2 text-[10px] text-muted-foreground flex items-center gap-1">
              <Music className="w-3 h-3" />
              Inferred original key: {result.originalKey}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}