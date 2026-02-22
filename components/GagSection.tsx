'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { motion } from 'framer-motion';

export default function GagSection() {
  const { data: session, status } = useSession();

  return (
    <section className="relative z-10 px-4 pb-24 md:pb-32">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="border border-cyan-400/30 rounded-2xl p-8 md:p-12 bg-gray-900/40 backdrop-blur-sm"
          style={{ boxShadow: '0 0 30px rgba(0,255,255,0.05)' }}
        >
          {status === 'loading' && (
            <p className="text-gray-400 text-sm" style={{ fontFamily: 'Orbitron, monospace' }}>
              Authenticating...
            </p>
          )}

          {status === 'unauthenticated' && (
            <>
              <p className="text-xs text-cyan-400/60 uppercase tracking-widest mb-3" style={{ fontFamily: 'Orbitron, monospace' }}>
                Classified
              </p>
              <h2
                className="text-2xl md:text-3xl font-bold text-white mb-3"
                style={{ fontFamily: 'Orbitron, monospace' }}
              >
                🔒 Restricted Access
              </h2>
              <p className="text-gray-400 mb-8 text-sm md:text-base">
                Sign in to view exclusive content.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => signIn('github')}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium border border-gray-600"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  Sign in with GitHub
                </button>
                <button
                  onClick={() => signIn('google')}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-gray-100 text-gray-800 rounded-lg transition-colors duration-200 text-sm font-medium"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Sign in with Google
                </button>
              </div>
            </>
          )}

          {status === 'authenticated' && session && (
            <>
              {session.user?.image && (
                <img
                  src={session.user.image}
                  alt={session.user.name ?? 'User'}
                  className="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-cyan-400/40"
                />
              )}
              <h2
                className="text-2xl md:text-3xl font-bold text-white mb-4"
                style={{ fontFamily: 'Orbitron, monospace' }}
              >
                Hey, {session.user?.name?.split(' ')[0]}.
              </h2>
              <p className="text-gray-300 text-base md:text-lg mb-2">
                ...You actually signed in.
              </p>
              <p className="text-gray-400 text-sm md:text-base mb-8">
                There's nothing here. What were you expecting? 💀
              </p>
              <button
                onClick={() => signOut()}
                className="px-5 py-2 text-sm text-gray-400 hover:text-white border border-gray-600 hover:border-gray-400 rounded-lg transition-colors duration-200"
              >
                Sign out (finally)
              </button>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
