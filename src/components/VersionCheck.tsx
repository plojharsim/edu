"use client";

import React, { useEffect, useState } from 'react';
import { 
  AlertDialog, AlertDialogContent, AlertDialogDescription, 
  AlertDialogHeader, AlertDialogTitle, AlertDialogAction 
} from "@/components/ui/alert-dialog";
import { dbService } from '@/services/dbService';
import { APP_VERSION } from '@/utils/version';
import { RefreshCw, Download } from 'lucide-react';

const VersionCheck = () => {
  const [outdated, setOutdated] = useState(false);

  useEffect(() => {
    const check = async () => {
      const minVersion = await dbService.getMinVersion();
      if (minVersion && minVersion !== APP_VERSION) {
        // Jednoduché porovnání (v reálné aplikaci by se hodila knihovna semver)
        setOutdated(true);
      }
    };
    check();
  }, []);

  if (!outdated) return null;

  return (
    <AlertDialog open={outdated}>
      <AlertDialogContent className="rounded-[2.5rem] bg-card border-border max-w-sm">
        <AlertDialogHeader>
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-amber-500/10 rounded-3xl">
              <RefreshCw className="w-8 h-8 text-amber-600 animate-spin-slow" />
            </div>
          </div>
          <AlertDialogTitle className="text-2xl font-black text-center text-foreground">Nová verze k dispozici!</AlertDialogTitle>
          <AlertDialogDescription className="text-center text-muted-foreground">
            Tvoje aplikace je zastaralá (v{APP_VERSION}). Pro pokračování je nutné aplikaci aktualizovat.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="pt-4">
          <AlertDialogAction 
            onClick={() => window.location.reload()}
            className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg gap-2"
          >
            <Download className="w-5 h-5" /> Aktualizovat
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default VersionCheck;