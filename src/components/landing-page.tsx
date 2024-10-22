"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Brain,
  Zap,
  Trophy,
  Wallet,
  Users,
  BarChart,
  // // Sparkles,
  // Cpu,
  // Globe,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function LandingPageComponent() {
  return (
    <div className='  flex flex-col min-h-screen bg-[#0E0E0E] text-white'>
      <header className='px-4 lg:px-6 h-14 flex items-center border-b border-[#1E1E1E] container mx-auto'>
        <Link className='flex items-center justify-center' href='#'>
          <Brain className='h-6 w-6 mr-2 text-[#00FFFF]' />
          <span className='font-bold text-[#00FFFF]'>Op</span>
        </Link>
        <nav className='ml-auto flex gap-4 sm:gap-6  '>
          <Link
            className='text-sm font-medium hover:text-[#00FFFF] transition-colors'
            href='#features'>
            Features
          </Link>
          <Link
            className='text-sm font-medium hover:text-[#00FFFF] transition-colors'
            href='#benefits'>
            Benefits
          </Link>
          <Link
            className='text-sm font-medium hover:text-[#00FFFF] transition-colors'
            href='#cta'>
            Get Started
          </Link>
        </nav>
      </header>
      <main className='flex-1 container mx-auto'>
        <section className='w-full py-12 md:py-24 lg:py-32 xl:py-48'>
          <div className='container px-4 md:px-6'>
            <div className='grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]'>
              <div className='flex flex-col justify-center space-y-4'>
                <div className='space-y-2'>
                  <h1 className='text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500'>
                    Revolutionize AI with Prompt Mining
                  </h1>
                  <p className='max-w-[600px] text-gray-400 md:text-xl'>
                    Join the forefront of AI advancement. Test, refine, and
                    perfect prompts to push the boundaries of language models.
                  </p>
                </div>
                <div className='flex flex-col gap-2 min-[400px]:flex-row'>
                  <Button
                    className='bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:from-orange-600 hover:to-pink-600'
                    size='lg'>
                    Get Started
                    <ArrowRight className='ml-2 h-4 w-4' />
                  </Button>
                  <Button variant='outline' size='lg'>
                    Learn More
                  </Button>
                </div>
              </div>
              <div className='flex items-center justify-center'>
                <div className='relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px]'>
                  <div className='absolute inset-0 bg-gradient-to-r from-[#00FFFF] to-[#FF00FF] rounded-full blur-3xl opacity-30'></div>
                  <div className='relative w-full h-full bg-[#1E1E1E] rounded-3xl border border-[#333333] p-6 flex items-center justify-center'>
                    <Brain className='w-24 h-24 text-[#00FFFF]' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id='features' className='w-full py-12 md:py-24 lg:py-32'>
          <div className='container px-4 md:px-6'>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500'>
              Why Prompt Mining Matters
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <div className='relative group col-span-1 md:col-span-2 row-span-2 transition-all duration-300 ease-in-out hover:scale-[1.02]'>
                <div className='absolute inset-0 bg-gradient-to-r from-[#00FFFF] to-[#FF00FF] rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200'></div>
                <div className='relative bg-[#1E1E1E] rounded-lg border border-[#333333] p-6 h-full flex flex-col justify-between overflow-hidden'>
                  <div>
                    <Zap className='h-10 w-10 text-[#00FFFF] mb-4 animate-pulse' />
                    <h3 className='text-xl font-bold mb-2'>
                      Advance AI Capabilities
                    </h3>
                    <p className='text-gray-400 mb-4'>
                      Push the limits of AI by refining and testing prompts.
                      Every contribution helps shape the future of smarter, more
                      adaptive, and secure AI systems. Your work directly
                      impacts the development of next-generation AI
                      technologies.
                    </p>
                    <div className='relative w-full h-48 md:h-64 rounded-lg overflow-hidden'>
                      <Image
                        src='/placeholder.svg?height=256&width=384'
                        alt='AI Capabilities Visualization'
                        layout='fill'
                        objectFit='cover'
                        className='transition-transform duration-300 group-hover:scale-110'
                      />
                    </div>
                  </div>
                  <Button className='bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:from-orange-600 hover:to-pink-600 mt-4 group-hover:animate-bounce'>
                    Explore Capabilities
                  </Button>
                </div>
              </div>
              <div className='relative group transition-all duration-300 ease-in-out hover:scale-[1.02]'>
                <div className='absolute inset-0 bg-gradient-to-r from-[#00FFFF] to-[#FF00FF] rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200'></div>
                <div className='relative bg-[#1E1E1E] rounded-lg border border-[#333333] p-6 h-full overflow-hidden'>
                  <Brain className='h-10 w-10 text-[#FF00FF] mb-4 group-hover:animate-spin' />
                  <h3 className='text-xl font-bold mb-2'>
                    Contribute to Groundbreaking Research
                  </h3>
                  <p className='text-gray-400'>
                    Be part of cutting-edge AI research. Your participation
                    directly supports the discovery of vulnerabilities and the
                    development of stronger, more reliable AI models.
                  </p>
                </div>
              </div>
              <div className='relative group transition-all duration-300 ease-in-out hover:scale-[1.02]'>
                <div className='absolute inset-0 bg-gradient-to-r from-[#00FFFF] to-[#FF00FF] rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200'></div>
                <div className='relative bg-[#1E1E1E] rounded-lg border border-[#333333] p-6 h-full overflow-hidden'>
                  <Trophy className='h-10 w-10 text-[#00FFFF] mb-4 group-hover:animate-bounce' />
                  <h3 className='text-xl font-bold mb-2'>
                    Earn Rewards for Your Efforts
                  </h3>
                  <p className='text-gray-400'>
                    Fine-tune prompts to earn points and unlock exclusive
                    features. Successful jailbreaks and prompt optimizations
                    bring even greater rewards, recognizing your valuable
                    contributions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id='benefits'
          className='w-full py-12 md:py-24 lg:py-32 bg-[#1E1E1E]'>
          <div className='container px-4 md:px-6'>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500'>
              Benefits of Participation
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <div className='relative group md:col-span-2'>
                <div className='absolute inset-0 bg-gradient-to-r from-[#00FFFF] to-[#FF00FF] rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200'></div>
                <div className='relative rounded-lg border border-[#333333] bg-[#0E0E0E] p-6 h-full'>
                  <Wallet className='h-10 w-10 text-[#00FFFF] mb-4' />
                  <h3 className='text-xl font-bold mb-2'>
                    Flexible Participation
                  </h3>
                  <p className='text-gray-400'>
                    Use your own GPU, OpenAI API, or even your computer&apos;s
                    CPU to contribute. Our platform adapts to your resources,
                    making it easy for anyone to get involved in AI advancement.
                  </p>
                </div>
              </div>
              <div className='relative group row-span-2'>
                <div className='absolute inset-0 bg-gradient-to-r from-[#00FFFF] to-[#FF00FF] rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200'></div>
                <div className='relative rounded-lg border border-[#333333] bg-[#0E0E0E] p-6 h-full flex flex-col justify-between'>
                  <div>
                    <BarChart className='h-10 w-10 text-[#FF00FF] mb-4' />
                    <h3 className='text-xl font-bold mb-2'>
                      Real-time Feedback
                    </h3>
                    <p className='text-gray-400'>
                      See immediate results and track your progress on the
                      dashboard. Our advanced analytics provide insights into
                      your contributions and their impact on AI development.
                    </p>
                  </div>
                  <Button className='bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:from-orange-600 hover:to-pink-600 mt-4'>
                    View Dashboard
                  </Button>
                </div>
              </div>
              <div className='relative group'>
                <div className='absolute inset-0 bg-gradient-to-r from-[#00FFFF] to-[#FF00FF] rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200'></div>
                <div className='relative rounded-lg border border-[#333333] bg-[#0E0E0E] p-6 h-full'>
                  <Users className='h-10 w-10 text-[#00FFFF] mb-4' />
                  <h3 className='text-xl font-bold mb-2'>
                    Community Collaboration
                  </h3>
                  <p className='text-gray-400'>
                    Join a community of AI enthusiasts and researchers working
                    towards common goals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id='cta' className='w-full py-12 md:py-24 lg:py-32'>
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center space-y-4 text-center'>
              <div className='space-y-2'>
                <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500'>
                  Ready to Start Mining?
                </h2>
                <p className='mx-auto max-w-[600px] text-gray-400 md:text-xl'>
                  Connect your wallet to access the dashboard and begin your
                  prompt mining journey.
                </p>
              </div>
              <Button
                className='bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:from-orange-600 hover:to-pink-600'
                size='lg'>
                Connect Wallet
                <ArrowRight className='ml-2 h-4 w-4' />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className='flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-[#1E1E1E]'>
        <p className='text-xs text-gray-500'>© 2024 Op. All rights reserved.</p>
        <nav className='sm:ml-auto flex gap-4 sm:gap-6'>
          <Link
            className='text-xs hover:underline underline-offset-4 text-gray-500 hover:text-[#00FFFF]'
            href='#'>
            Terms of Service
          </Link>
          <Link
            className='text-xs hover:underline underline-offset-4 text-gray-500 hover:text-[#00FFFF]'
            href='#'>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
