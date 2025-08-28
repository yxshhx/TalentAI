'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export function ConfigPanel() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
          <span className="sr-only">Open Settings</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Configuration</SheetTitle>
          <SheetDescription>
            Manage AI models and system settings. Changes are for demonstration purposes only.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-6 py-6">
          <div className="grid gap-3">
            <Label htmlFor="nlp-model">NLP Model</Label>
            <Select defaultValue="transformers">
              <SelectTrigger id="nlp-model">
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="transformers">Transformers (BERT)</SelectItem>
                <SelectItem value="spacy">spaCy</SelectItem>
                <SelectItem value="nltk">NLTK</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="llm-provider">LLM Provider</Label>
            <Select defaultValue="google">
              <SelectTrigger id="llm-provider">
                <SelectValue placeholder="Select a provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="google">Google (Gemini Pro)</SelectItem>
                <SelectItem value="openai">OpenAI (GPT-4)</SelectItem>
                <SelectItem value="anthropic">Anthropic (Claude)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="ranking-algo">Ranking Algorithm</Label>
            <Select defaultValue="semantic">
              <SelectTrigger id="ranking-algo">
                <SelectValue placeholder="Select an algorithm" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="semantic">Semantic Matching</SelectItem>
                <SelectItem value="gradient">Gradient Boosting</SelectItem>
                <SelectItem value="rule-based">Rule-Based System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
