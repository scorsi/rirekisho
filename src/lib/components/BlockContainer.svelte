<section class="flex flex-col mx-6 sm:mx-0 print:mx-0 bg-white rounded-xl md:rounded-2xl p-8 shadow-inner print:p-4 print:rounded-lg print:border print:shadow-none">
  <div class="text-xl sm:text-2xl md:text-4xl print:text-xl" >
    <slot name="title" />
  </div>
  <hr class="mb-4 sm:mb-6 md:mb-8 mt-2 print:mb-4" />
  <div class="w-full grow flex">
    <div class="w-full self-center">
      <slot name="content" />
    </div>
  </div>
</section>